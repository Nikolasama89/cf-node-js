const mathOperations = require("../app")

// Rules only for sum function
describe("Calculator Test Sum", () => {
  
  test("Addition of 2 numbers", () => {
    let result = mathOperations.sum(2, 3)
    
    expect(result).toBe(5)
  })

  test("Addition of 2 numbers with error", () => {
    let result = mathOperations.sum(2, 3)
    expect(result).toBe(8)
  })
})