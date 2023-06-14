
export const routeTo = <From extends string, To extends string>(from: From, to: To) => {
    return `${from}${to}` as `${From}${To}`;
}