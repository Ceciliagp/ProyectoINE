export const server = 'localhost:44343';
export const apiUrl = `https://${server}/`;
export const apiServer= `https://webapi-aufit.onrender.com/`;
export const esProduccion = true;

export class API{
    public static get_url(path: string): string {
        if(esProduccion)
            return `${apiServer}${path}`;

        return `${apiUrl}${path}`;
    }
}