/*
 * @Author: peiyang 
 * @Date: 2018-08-06 21:00:17 
 * @Last Modified by: peiyang
 * @Last Modified time: 2018-08-06 22:10:35
 */

interface String {
    format(str: string[]): string;
}
String.prototype.format = function (params ? : string[]): string {
    if (!params) {
        return this;
    }
    for (let index in params) {
        let str = params[index];
        this.replace(`{${index}}`, str);
    }
    return this;
}