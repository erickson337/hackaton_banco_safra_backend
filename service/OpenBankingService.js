const axios = require('axios')
const { OpenBanking } = require('../models')

const find = async () => {
  const URL_COMPARATOR = [
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
    ['https://api.safra.com.br/open-banking', 'https://openbanking.api.santander.com.br/open-banking'],
  ]
  const requestPromises = [
    compareServiceProductWithOtherBank(URL_COMPARATOR[0], '/products-services/v1/personal-credit-cards', 'personalCreditCards', 'UTILIZACAO_CANAIS_ATENDIMENTO_RETIRADA_ESPECIE_BRASIL'),
    compareServiceProductWithOtherBank(URL_COMPARATOR[1], '/products-services/v1/personal-accounts', 'personalAccounts', 'TRANSFERENCIA_DOC_TERMINAL_AUTOATENDIMENTO_OUTROS_MEIOS_ELETRONICOS'),
    compareServiceProductWithOtherBank(URL_COMPARATOR[2], '/products-services/v1/business-credit-cards', 'businessCreditCards', 'UTILIZACAO_CANAIS_ATENDIMENTO_RETIRADA_ESPECIE_BRASIL'),
    compareServiceProductWithOtherBank(URL_COMPARATOR[3], '/products-services/v1/personal-unarranged-account-overdraft', 'personalUnarrangedAccountOverdraft', 'CONCESSAO_ADIANTAMENTO_DEPOSITANTE'),
    compareServiceProductWithOtherBank(URL_COMPARATOR[4], '/products-services/v1/business-unarranged-account-overdraft', 'businessUnarrangedAccountOverdraft', 'CONCESSAO_ADIANTAMENTO_DEPOSITANTE'),
    compareServiceProductWithOtherBank(URL_COMPARATOR[5], '/products-services/v1/personal-accounts', 'personalAccounts', 'TRANSFERENCIA_TED_TERMINAL_AUTOATENDIMENTO_OUTROS_MEIOS_ELETRONICOS')
  ]

  return Promise.all(requestPromises).then(values => values);
}

const compareServiceProductWithOtherBank = async (endpoints = [], path, namePropApi, nameProduct) => {
  const getDataModified = getPropertiesApi(namePropApi, nameProduct);
  const resultSafra = await axios.get(`${endpoints[0]}${path}`).then(({ data }) => data)
  const resultOtherBank = await axios.get(`${endpoints[1]}${path}`).then(({ data }) => data)

  return getDataModified(resultSafra, resultOtherBank)
}

const getPropertiesApi = (namePropApi, nameProduct) => {
  return ({ data: dataSafra }, { data: dataOtherBank }) => {
    const FAIL_SEARCH_PRODUCT = 'N/A';
    const resultSafra = getPropertyOfProduct(dataSafra, namePropApi, nameProduct) ?? {}
    const resultOtherBank = getPropertyOfProduct(dataOtherBank, namePropApi, nameProduct) ?? {}
    const isProductBusiness = namePropApi.indexOf('business') >= 0 ? true : false

    return new OpenBanking(
      dataSafra.brand.name ?? FAIL_SEARCH_PRODUCT,
      isProductBusiness,
      resultSafra.name ?? FAIL_SEARCH_PRODUCT,
      resultSafra.minimum.value ?? FAIL_SEARCH_PRODUCT,
      resultSafra.maximum.value ?? FAIL_SEARCH_PRODUCT,
      'Banco B',
      resultOtherBank.minimum.value ?? FAIL_SEARCH_PRODUCT,
      resultOtherBank.maximum.value ?? FAIL_SEARCH_PRODUCT,
      parseFloat(resultSafra.minimum?.value) <= parseFloat(resultOtherBank.minimum?.value) ? true : false,
      parseFloat(resultSafra.maximum?.value) <= parseFloat(resultOtherBank.maximum?.value) ? true : false
    ).toDTO();
  }
}

const getPropertyOfProduct = (data, namePropApi, nameProduct) => {
  const { brand: { companies } } = data
  const firstCompany = companies[0]

  for (let service of firstCompany[namePropApi]) {
    let result = filterProduct(service, nameProduct)
    if (result) {
      return result
    }
  }
  return null
}

const filterProduct = (company, nameProduct) => {
  const propService = company.fees['services'] ? company.fees['services'] : company.fees['priorityServices']
  return propService && propService.find(field => field.name === nameProduct)
}

module.exports = {
  find
}