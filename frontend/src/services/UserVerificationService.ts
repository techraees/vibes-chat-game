import ApiService from './ApiService'
import { VerifyCredential, VerifyCredentialResponse } from '@/@types/verify'

export async function apiVerify(data: VerifyCredential) {
    return ApiService.fetchData<VerifyCredentialResponse>({
        url: '/verify',
        method: 'post',
        data,
    })
}
