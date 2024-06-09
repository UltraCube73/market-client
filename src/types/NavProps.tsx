export type NavParamList =
{
    StartScreen: undefined,
    LoginScreen:
    {
        loginText: string;
    },
    MainScreen:
    {
        login: string;
        password: string;
        jwtKey: string;
    },
    ExceptionScreen: undefined,
    RegistrationScreen: undefined
};