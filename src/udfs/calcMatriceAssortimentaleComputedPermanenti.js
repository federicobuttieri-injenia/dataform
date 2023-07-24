const DAYS_STOCKOUT = 9 * 7;

const MILLISECONDS_PER_DAY = 1000 * 3600 * 24;

function dateDiffInDays(a, b) {
  if (b == null) {
    return null;
  }
  return (b - a) / MILLISECONDS_PER_DAY;
}

function* dateRange(inizio, fine, year) {
  console.assert(inizio <= fine);
  const nye = new Date(year + 1 + "-01-01").getTime();

  var currentDay = inizio;
  while (currentDay < fine && currentDay < nye) {
    yield currentDay;
    currentDay += MILLISECONDS_PER_DAY;
  }
}

function* calcMatriceAssortimentaleComputedPermanenti(
  giorni,
  year,
  daysStockout = DAYS_STOCKOUT
) {
  const movimenti = giorni.sort((date1, date2) => date1 - date2);
  // This silly approach avoids error in dataform because of the dollar sign
  const lastDayYear = new Date(year + 1 + "-01-01").getTime();

  function* computeEndDate(firstDate, secondDate) {
    const endStockoutDate = firstDate + daysStockout * MILLISECONDS_PER_DAY;

    // second date < DAYS STOCKOUT ()

    const endPeriod =
      secondDate && secondDate <= endStockoutDate
        ? secondDate
        : endStockoutDate;

    yield* dateRange(firstDate, endPeriod, year);
  }

  const dates = movimenti.map((data, index, full) => [
    data,
    full[index + 1] || null
  ]);

  for ([firstDate, secondDate] of dates) {
    const [firstDateMillis, secondDateMillis] = [
      firstDate.getTime(),
      secondDate && secondDate.getTime()
    ];
    const endRange = secondDateMillis ? secondDateMillis : lastDayYear;

    const difference = dateDiffInDays(firstDateMillis, secondDateMillis);

    if (difference == null) {
      yield* computeEndDate(firstDateMillis, secondDateMillis);
    } else {
      yield* difference < daysStockout
        ? dateRange(firstDateMillis, endRange, year)
        : computeEndDate(firstDateMillis, endRange);
    }
  }
}

// UDF Call
// return [
//   ...calcMatriceAssortimentaleComputedPermanenti(giorni, year, days_stockout)
// ].map((date) => new Date(date).toISOString().slice(0, 10));

module.exports = { calcMatriceAssortimentaleComputedPermanenti, dateRange };
