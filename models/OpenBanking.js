class OpenBanking {
  constructor(nameBank, isProductBusiness, nameProduct, minValue, maxValue, nameBankOtherBank, minValueOtherBank, maxValueOtherBank, safraMaxValueIsBetter, safraMinValueIsBetter) {
    this.nameBank = nameBank
    this.isProductBusiness = isProductBusiness
    this.nameProduct = nameProduct
    this.minValue = minValue
    this.maxValue = maxValue
    this.nameBankOtherBank = nameBankOtherBank
    this.minValueOtherBank = minValueOtherBank
    this.maxValueOtherBank = maxValueOtherBank
    this.safraMaxValueIsBetter = safraMaxValueIsBetter
    this.safraMinValueIsBetter = safraMinValueIsBetter
  }

  toDTO() {
    return {
      nameBank: this.nameBank,
      isProductBusiness: this.isProductBusiness,
      nameProduct: this.nameProduct,
      minValue: this.minValue,
      maxValue: this.maxValue,
      nameBankOtherBank: this.nameBankOtherBank,
      minValueOtherBank: this.minValueOtherBank,
      maxValueOtherBank: this.maxValueOtherBank,
      safraMaxValueIsBetter: this.safraMaxValueIsBetter,
      safraMinValueIsBetter: this.safraMinValueIsBetter
    }
  }
}

module.exports = {
  OpenBanking
}