import url from './URL';

//flatten
export function flattenProducts(data) {
    return data.map(item => {
        //cloudinary
        let image = item.image.url;

        //local setup no deployment
        //let image = `${url}${item.image.url}`
        return {
            ...item, image
        }

    });
}
// helper functions
export function featuredProducts(data) {
    return data.filter(d => d.featured === true)
}

