import gql from 'graphql-tag';
import userServices from '../utils/userServices'



// export default gql`
//     {
//         user(googleId: "115017414006295624552" ) {
//             name
//             _id
//           }
//     }
// `;


// export default gql`
// mutation LoginOrSignup($name: String, $email: String, $googleId: String, $imageUrl: String, $id_token: String){
//     LoginOrSignup(name: "$robert test1", email: "robertest001@gmail.com", googleId: "115017414006295624552", imageUrl: "https://lh4.googleusercontent.com/-vrSIdN3WQXI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnV5CcRyjhi-Z50fxpgG3jFPi1gqw/s96-c/photo.jpg", id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3OGFiMWRjNTkxM2Q5MjlkMzdjMjNkY2FhOTYxODcyZjhkNzBiNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzQyOTk4ODk2MjYyLTNmODBldHM3c2pkM2Nmdm85cnJuN3Fwc242cWYyMmJsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzQyOTk4ODk2MjYyLTNmODBldHM3c2pkM2Nmdm85cnJuN3Fwc242cWYyMmJsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1MDE3NDE0MDA2Mjk1NjI0NTUyIiwiZW1haWwiOiJyb2JlcnRlc3QwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJmQXY5eVI2bEdMb3JBRlVkQ2hBWkp3IiwibmFtZSI6InJvYmVydCB0ZXN0MSIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLXZyU0lkTjNXUVhJL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y25WNUNjUnlqaGktWjUwZnhwZ0czakZQaTFncXcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6InJvYmVydCIsImZhbWlseV9uYW1lIjoidGVzdDEiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYwMzM4MTkyMywiZXhwIjoxNjAzMzg1NTIzLCJqdGkiOiIxMWY3ODViMGY2ZjUwMDE2YjJhYjQ0ZDRkNWE4ZWU1YWE4ZGQ2ZjFlIn0.ROk9vAVOM5Ngt-aTVdKSNwxFBuOKZaHzNcI89bm3913i78ZFba9WYlGGZX_UkQ_2Oty482HQ8p8Qn_UCBQ8_gQnymNGVlwAc7N05Zg6Ns6V9r5ReT709LgWlTJIiFndRMY1lPRCpa3m0PzxCArMEIDq_EDGj6dP6_XKkInZimPmkm0Y8667fhMa9tWwYFDC7Dr8ITmc2EuZsfLGcffBjZenjSdWsx87PdxkXvNLXAgVwkWIVGzbhFKiSY8x_oePn86_WupA8th3T8Zx0wWlu1qmiclT51EErA2fI2ene0BHSZrJAWjussInzA8LqDNbvJY6ELcskBaWczD8gADU4Lw") {
//   name
//   email
//   googleId
//   imageUrl
//     }
// }
// `;



export default gql` 
{
    LoginOrSignup(name:"bob", email: "bob@email.com", googleId: "1234", imageUrl: "www.yodododod.com/image") {
        email
    }
}`