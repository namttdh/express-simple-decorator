export const IWebServiceName = 'IWebService';

export interface IWebService {
    /** @desc run application */
    run();

    /** @desc get instance of web service */
    instance();
}
