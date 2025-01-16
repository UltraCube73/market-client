import { MobileAppItem } from "./Items";

export type NavParamList =
    {
        StartScreen: undefined,
        LoginScreen: undefined,
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
            password: string;
        }
    };