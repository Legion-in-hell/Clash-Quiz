import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Ajoutez d'autres fournisseurs si nécessaire
    ],
    // Configurez d'autres options ici
})