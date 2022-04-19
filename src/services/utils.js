export function mapObjectToParams(model, values) {
    let formValue = {};
    model.forEach((each) => {
        formValue[each] = values[each];
    });
    return formValue;
}

export function fileToByteArray(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            const fileByteArray = [];
            reader.readAsDataURL(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState == FileReader.DONE) {
                    let arrayBuffer = evt.target.result,
                        array = new Uint8Array(arrayBuffer);
                    for (const byte of array) {
                        fileByteArray.push(byte);
                    }
                }
                resolve(reader.result);
            }
        }
        catch (e) {
            reject(e);
        } 
    })
}
