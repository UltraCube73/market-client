import { MobileAppItem } from "./Items";

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
        jwtKey: string;
    },
    ExceptionScreen: undefined,
    RegistrationScreen: undefined,
    ApplicationScreen:
    {
        login: string;
        jwtKey: string;
        application: MobileAppItem;
    },
    EmailVerificationScreen:
    {
        login: string;
        jwtKey: string;
    }
};