const matriceAssortimentale = require("./matriceAssortimentale");

describe("Common Maxmara", function () {
  it("Fits with STAGIONE_CONTESTI_VALIDITA_TSL", () =>
    ((tables) => {
      expect(tables.fCaricato.whereClause).toEqual(
        `P.stagionale = "STAGIONALE" AND (_TABLE_SUFFIX IN ('20210101','20220101') AND C.anno = 2022 AND C.stagione = 1 AND contesto NOT IN ('003','004','005','006','008','009','010','011','007')) OR (_TABLE_SUFFIX IN ('20220101','20230101') AND C.anno = 2022 AND C.stagione = 2 AND contesto NOT IN ('003','004','005','006','008','009','010','011','007')) OR (_TABLE_SUFFIX IN ('20210101','20220101') AND C.anno = 2021 AND C.stagione = 2 AND contesto NOT IN ('003','004','005','006','008','009','010','011','007')) OR (_TABLE_SUFFIX IN ('20220101','20230101') AND C.anno = 2023 AND C.stagione = 1 AND contesto NOT IN ('003','004','005','006','008','009','010','011','007'))`
      );
    })(
      matriceAssortimentale.forYear(2022, {
        isoWeekYear: () => 2023,
        isoWeek: () => 23
      })
    ));
  it("Fits partially with STAGIONE_CONTESTI_VALIDITA_TSL", () =>
    ((tables) => {
      expect(tables.fCaricato.whereClause).toEqual(
        `P.stagionale = "STAGIONALE" AND (_TABLE_SUFFIX IN ('20220101','20230101') AND C.anno = 2023 AND C.stagione = 1 AND contesto NOT IN ('003','004','005','006','008','009','010','011','007')) OR (_TABLE_SUFFIX IN ('20230101','20240101') AND C.anno = 2023 AND C.stagione = 2 AND contesto NOT IN ('003','004','005','006','008','009','010','011','007'))`
      );
    })(
      matriceAssortimentale.forYear(2023, {
        isoWeekYear: () => 2023,
        isoWeek: () => 23
      })
    ));
  it("Fits partially with STAGIONE_CONTESTI_VALIDITA_TSL", () =>
    ((tables) => {
      expect(tables.fCaricato.whereClause).toEqual(
        `P.stagionale = "STAGIONALE" AND (_TABLE_SUFFIX IN ('20230101','20240101') AND C.anno = 2023 AND C.stagione = 2 AND contesto NOT IN ('003','004','005','006','008','009','010','011','007'))`
      );
    })(
      matriceAssortimentale.forYear(2024, {
        isoWeekYear: () => 2023,
        isoWeek: () => 23
      })
    ));
  it("Future years are not allowed (dataform_retail rule)", () => {
    const invalidRequest = () =>
      matriceAssortimentale.forYear(2025, {
        isoWeekYear: () => 2023,
        isoWeek: () => 23
      }).fCaricato.whereClause;

    expect(invalidRequest).toThrow(
      new Error(
        "Query 'f_caricato' can't be computed using 2025 as year. It won't have data nor assigned shard"
      )
    );
  });
});
