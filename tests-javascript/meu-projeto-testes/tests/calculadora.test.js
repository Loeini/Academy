const { soma } = require("../src/calculadora");

describe("Calculadora", () => {
    test("deve somar dois números corretamente", () => {
        // Arrange (Preparação)
        const num1 = 2;
        const num2 = 3;

        // Act (Ação)
        const resultado = soma(num1, num2);

        // Assert (Verificação)
        expect(resultado).toBe(5);
    });
});
