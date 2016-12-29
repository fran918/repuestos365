interface AuthConfiguration {
    clientID: string,
    domain: string,
    responseType: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    domain: 'rep365.auth0.com',
    clientID: 'daZBFFiuav04WCkiJ872hgcR4JZzFY1J',
    responseType: 'token',
    // You may need to change this!
    //callbackURL: 'http://localhost:8080/'
    callbackURL: 'http://nodejs-mongo-persistent-rep-365.44fs.preview.openshiftapps.com/'
    //callbackURL: 'http://localhost:4200/home'
};