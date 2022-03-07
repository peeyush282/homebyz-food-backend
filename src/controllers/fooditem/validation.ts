export function validateFoodItem(req) {
    const { name, menuHeader, description, type, attributes, weightAttribute, sellWithin } = req.body;
    const { vegSpecific, sugarLevel, spiceLevel } = attributes;
    const { packageWeight, itemWeight } = weightAttribute;

    const resultS1 = requiredParam({ name, menuHeader, description, type, attributes, weightAttribute, sellWithin });
    if (!resultS1.success) {
        return { _success: resultS1.success, _message: resultS1.message };
    }

    const resultS2 = requiredParam({ vegSpecific, sugarLevel, spiceLevel });
    if (!resultS2.success) {
        return { _success: resultS2.success, _message: resultS2.message };
    }

    const resultS3 = requiredParam({ packageWeight, itemWeight });
    if (!resultS3.success) {
        return { _success: resultS3.success, _message: resultS3.message };
    }
}

export function requiredParam(...params) {
    const objKeys = Object.keys(params[0]);
    const objValues = Object.values(params[0]);
    let isParam = { value: null, index: null };
    objValues.map((param, index) => {
        console.log(param);

        if (!param) {
            isParam = { value: false, index };
        }
    });
    if (isParam.value === false) {
        return { success: false, message: `Required Parameter ${objKeys[isParam.index]} is missing!` };
    }

    return { success: true, message: 'ok' };
}
