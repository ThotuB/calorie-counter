export const dateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-indexed
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}