import converter from "../utils/converter.js";

describe("Currency converter logic", () => {

    test("converts amount correctly", () => {
        const amount = 100;
        const rate = 0.5;
        const result = converter(amount, rate);
        expect(result).toBe(50);
    });

    test("Returns zero when amount is zero", () => {
        const result = converter(0, 0.7);
        expect(result).toBe(0);
    });

    test("Returns zero when rate is zero", () => {
        const result = converter(222, 0);
        expect(result).toBe(0);
    });

    test("Multiplies correctly with whole numbers", () => {
        const result = converter(222, 2);
        expect(result).toBe(444);

    });

    test("Very large numbers (millions/billions)", () => {
        const result = converter(1e10, 2);   
        expect(result).toBe("number is invalid");

    });

    test("Very small decimals (0.0001)", () => {
        const result = converter(2, 0.0001);
        expect(result).toBe("invalid");

    });

    test("Negative amounts", () => {
        const result = converter(-1, 2);
        expect(result).toBe("invalid");
    });

    test("What happens with null/undefined", () => {
        const result = converter(null, 2);
        expect(result).toBe("invalid");
    });

    test("What happens with string numbers", () => {
        const result = converter("100", "2");
        expect(result).toBe(200);
    });

    test("What happens with empty string as input", () => {
        const result = converter(" ", 2);
        expect(result).toBe("invalid");
    });

    test("What happens with special characters  as input", () => {
        const result = converter("@", 2);
        expect(result).toBe("invalid");
    });

    test("Reject Infinite numbers as input", () => {
        const result = converter(Infinity, 1);
        expect(result).toBe("invalid")
    })
});
