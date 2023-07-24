const {
  calcMatriceAssortimentaleComputedPermanenti
} = require("./calcMatriceAssortimentaleComputedPermanenti");

describe("Common Maxmara", function () {
  [
    {
      input: [new Date("2022-01-05"), new Date("2022-12-31")],
      year: 2022,
      daysStockout: 2,
      expected: ["2022-01-05", "2022-01-06", "2022-12-31"]
    },
    {
      input: [new Date("2022-01-05")],
      year: 2022,
      daysStockout: 3,
      expected: ["2022-01-05", "2022-01-06", "2022-01-07"]
    },
    {
      input: [new Date("2022-12-31")],
      year: 2022,
      daysStockout: 30,
      expected: ["2022-12-31"]
    },
    {
      input: [new Date("2027-12-31")],
      year: 2022,
      daysStockout: 30,
      expected: []
    }
  ].forEach(({ input, year, daysStockout, expected }) =>
    it("Days Stockout computation", () => {
      const matriceAssortimentaleComputedPermanenti =
        calcMatriceAssortimentaleComputedPermanenti(input, year, daysStockout);
      expect(expected).toEqual(
        [...matriceAssortimentaleComputedPermanenti].map((date) =>
          new Date(date).toISOString().slice(0, 10)
        )
      );
    })
  );
});
