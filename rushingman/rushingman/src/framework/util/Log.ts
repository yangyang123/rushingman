/*
 * @Author: peiyang 
 * @Date: 2018-08-06 11:41:54 
 * @Last Modified by: peiyang
 * @Last Modified time: 2018-08-06 22:09:12
 */

namespace sleepybear {
    export class Log {
        public static canShowLog: boolean = false;
        constructor() {}

        public static showLog(msg: string, ...params: string[]): void {
            let str = msg.format(params);
            if (sleepybear.Log.canShowLog) {
                console.log(str);
            }
        }

        public static rewrite(originFunc, originThis): any {
            return function (...params) {
                if (Log.canShowLog) {
                    return originFunc.apply(originThis || window, params);
                } else {
                    return false;
                }
            };
        }
    }
}

if (sleepybear.Log.rewrite) {
    console.log = sleepybear.Log.rewrite(console.log, console);
}