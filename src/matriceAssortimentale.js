const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
const duration = require("dayjs/plugin/duration");
dayjs.extend(isoWeek);
dayjs.extend(duration);

const STAGIONE_CONTESTI_VALIDITA_TSL = {
  20192: ["003", "004", "005", "006", "008", "009", "010", "011"],
  20201: ["007"]
};

// settimane da considerare per spegnimento matrice assortimentale permanenti
const DAYS_STOCKOUT = 9 * 7;

module.exports.forYear = function (yearToCompute, djs = dayjs()) {
  const year = Number(yearToCompute);

  const asts = [
    [year, 1],
    [year, 2],
    [year - 1, 2],
    [year + 1, 1]
  ];

  const getIsoWeekYear = () => {
    return { isoYear: djs.isoWeekYear(), isoWeek: djs.isoWeek() };
  };

  const whereParameters = (items, tableName) => {
    const validItems = items.filter((item) => item != null);

    if (validItems.length == 0) {
      throw new Error(
        `Query '${tableName}' can't be computed using ${year} as year. It won't have data nor assigned shard`
      );
    }

    return validItems.map((item) => `(${item})`).join(" OR ");
  };

  function fCaricatoWhereParameter(year, [astYear, astSeason]) {
    const {
      begin: { anno_retail: beginYearRetail },
      end: { anno_retail: endYearRetail },
      begin: { settimana_retail: beginWeekRetail },
      end: { settimana_retail: endWeekRetail }
    } = seasonRange(astYear, astSeason);
    const { isoYear: currentYear, isoWeek: currentWeek } = getIsoWeekYear();
    const astActivationPeriodBegin = `${beginYearRetail}${beginWeekRetail}`;
    const astActivationPeriodEnd = `${endYearRetail}${endWeekRetail}`;
    const today = `${currentYear}${currentWeek}`;

    if (
      !(
        year < currentYear ||
        (today >= astActivationPeriodBegin && today <= astActivationPeriodEnd)
      )
    ) {
      return null;
    }

    const yearToCompute = [`${beginYearRetail}0101`, `${endYearRetail}0101`];

    const blackListConditionFn = () => {
      const contextBlacklist = Object.entries(
        STAGIONE_CONTESTI_VALIDITA_TSL
      ).reduce(
        (acc, [k, v]) => (k <= `${astYear}${astSeason}` ? acc.concat(v) : acc),
        []
      );
      const blacklistedContexts = contextBlacklist
        .map((val) => `'${val}'`)
        .join(",");
      return `AND contesto NOT IN (${blacklistedContexts})`;
    };

    const tableSuffix = yearToCompute.map((val) => `'${val}'`).join(",");
    return `_TABLE_SUFFIX IN (${tableSuffix}) AND C.anno = ${astYear} AND C.stagione = ${astSeason} ${blackListConditionFn()}`;
  }

  const seasonRange = (year, season) => {
    if (season < 1 || season > 2) {
      throw new Error(`Season must be one of [1,2]`);
    }

    return {
      begin: {
        anno_retail: season == 1 ? year - 1 : year,
        settimana_retail: season == 1 ? 40 : 14
      },
      end: {
        anno_retail: season == 1 ? year : year + 1,
        settimana_retail: season == 1 ? 39 : 13
      }
    };
  };

  const minDayDate = dayjs(`${year}-01-01`).subtract(
    dayjs.duration({ days: DAYS_STOCKOUT })
  );

  const minMonth = minDayDate.format("YYYY-MM-01");
  const minDay = minDayDate.format("YYYY-MM-DD");
  const yearsToCompute = `'${year}0101' , '${year - 1}0101'`;

  return {
    fCaricato: {
      whereClause:
        `P.stagionale = "STAGIONALE" AND ` +
        whereParameters(
          asts.map((ast) => fCaricatoWhereParameter(year, ast)),
          "f_caricato"
        )
    },
    inputPermanenti: {
      vars: {
        minDay,
        minMonth,
        yearsToCompute
      }
    }
  };
};
