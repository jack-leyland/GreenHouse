import {gql} from '@apollo/client';
import type { epcCertificateObject } from '../../types';

export const GET_ADDRESSES = gql`
  query address($queryParam: String!) {
    address(postcode: $queryParam) {
      lmkKey
      address
    }
  }
`;

export const GET_CERTIFICATES = gql`
  query Certificate($queryParam: String!) {
    certificate(name: $queryParam) {
      
    }
  }
`;

export function buildCertificateQueryFromArray(queryParamArray: Array<string>) {
  if (!queryParamArray.length) {
    throw 'Query Builder expects non-empty object!';
  }
  let queryString = `
  query Certificate($queryParam: String!) {
    certificate(name: $queryParam) {
    `
  queryParamArray.forEach((param)=> {
    queryString.concat(param+'\n', queryString)
  })

  queryString.concat('\n'+'}'+'\n'+'}');

  return gql`$queryString`;

}