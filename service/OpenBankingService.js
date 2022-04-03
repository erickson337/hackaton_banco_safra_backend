const axios = require('axios')

const find = async () => {
  const URL_COMPARATOR = [
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking']
  ]
  return [
    await compareServiceProductWithOtherBank(URL_COMPARATOR[0], '/products-services/v1/personal-credit-cards', 'personalCreditCards', 'UTILIZACAO_CANAIS_ATENDIMENTO_RETIRADA_ESPECIE_BRASIL')
  ]
}

const compareServiceProductWithOtherBank = async (endpoints = [], path, namePropApi, nameProduct) => {
  const getPropsFunction = getPropertiesApi(namePropApi, nameProduct);
  const resultSafra = await axios.get(`${endpoints[0]}${path}`).then(({ data }) => data)
  const resultOtherBank = await axios.get(`${endpoints[1]}${path}`).then(({ data }) => data)

  return getPropsFunction(resultSafra, resultOtherBank)
}

const getPropertiesApi = (namePropApi, nameProduct) => {
  return ({ data: dataSafra }, { data: dataOtherBank }) => {
    const resultSafra = getPropertyOfProduct(dataSafra, namePropApi, nameProduct)
    const resultOtherBank = getPropertyOfProduct(dataOtherBank, namePropApi, nameProduct)

    return {
      nameBank: dataSafra.brand.name,
      nameProduct: resultSafra[0].name,
      minValue: resultSafra[0].minimum.value,
      maxValue: resultSafra[0].maximum.value,
      nameBankOtherBank: 'Banco B',
      nameProductOtherBank: resultOtherBank[0].name,
      minValueOtherBank: resultOtherBank[0].minimum.value,
      maxValueOtherBank: resultOtherBank[0].maximum.value,
      valueDiffSafraMin: resultSafra[0].minimum.value > resultOtherBank[0].minimum.value ? true : false,
      valueDiffSafraMax: resultSafra[0].maximum.value > resultOtherBank[0].maximum.value ? true : false
    }
  }
}

const getPropertyOfProduct = (data, namePropApi, nameProduct) => {
  const { brand: { companies } } = data
  const firstCompany = companies[0]
  return firstCompany[namePropApi].map(personalCreditCard => personalCreditCard.fees['services'] && personalCreditCard.fees['services'].find(field => field.name === nameProduct))
}

module.exports = {
  find
}