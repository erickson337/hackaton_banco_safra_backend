const axios = require('axios')

const find = async () => {
  const URL_COMPARATOR = [
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
  ]
  return [
    await compareServiceProductWithOtherBank(URL_COMPARATOR[0], '/products-services/v1/personal-credit-cards', 'personalCreditCards', 'UTILIZACAO_CANAIS_ATENDIMENTO_RETIRADA_ESPECIE_BRASIL'),
    await compareServiceProductWithOtherBank(URL_COMPARATOR[1], '/products-services/v1/personal-accounts', 'personalAccounts', 'TRANSFERENCIA_DOC_TERMINAL_AUTOATENDIMENTO_OUTROS_MEIOS_ELETRONICOS'),
    await compareServiceProductWithOtherBank(URL_COMPARATOR[2], '/products-services/v1/business-credit-cards', 'businessCreditCards', 'UTILIZACAO_CANAIS_ATENDIMENTO_RETIRADA_ESPECIE_BRASIL'),
    await compareServiceProductWithOtherBank(URL_COMPARATOR[3], '/products-services/v1/personal-unarranged-account-overdraft', 'personalUnarrangedAccountOverdraft', 'CONCESSAO_ADIANTAMENTO_DEPOSITANTE'),
    await compareServiceProductWithOtherBank(URL_COMPARATOR[4], '/products-services/v1/business-unarranged-account-overdraft', 'businessUnarrangedAccountOverdraft', 'CONCESSAO_ADIANTAMENTO_DEPOSITANTE'),
    await compareServiceProductWithOtherBank(URL_COMPARATOR[5], '/products-services/v1/personal-accounts', 'personalAccounts', 'TRANSFERENCIA_TED_TERMINAL_AUTOATENDIMENTO_OUTROS_MEIOS_ELETRONICOS'),

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
      nameProduct: resultSafra.name,
      minValue: resultSafra.minimum.value,
      maxValue: resultSafra.maximum.value,
      nameBankOtherBank: 'Banco B',
      minValueOtherBank: resultOtherBank.minimum.value,
      maxValueOtherBank: resultOtherBank.maximum.value,
      safraMaxValueIsBetter: parseFloat(resultSafra.minimum.value) <= parseFloat(resultOtherBank.minimum.value) ? true : false,
      safraMinValueIsBetter: parseFloat(resultSafra.maximum.value) <= parseFloat(resultOtherBank.maximum.value) ? true : false
    }
  }
}

const getPropertyOfProduct = (data, namePropApi, nameProduct) => {
  const { brand: { companies } } = data
  const firstCompany = companies[0]

  if (firstCompany[namePropApi].length === 1) {
    for (let service of firstCompany[namePropApi]) {
      return filterProduct(service, nameProduct)
    }
  } else {
    for (let key in firstCompany[namePropApi]) {
      let result = filterProduct(firstCompany[namePropApi][key], nameProduct)
      if (result) {
        return result
      }
    }
  }
}

const filterProduct = (company, nameProduct) => {
  const propService = company.fees['services'] ? company.fees['services'] : company.fees['priorityServices']
  return propService && propService.find(field => field.name === nameProduct)
}

module.exports = {
  find
}