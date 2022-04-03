class OpenBanking {
  constructor(nameBank, value) {
    this.nameBank = nameBank
    this.value = value
  }

  toDTO() {
    return {
      nameBank: this.userId,
      value: this.value
    }
  }
}