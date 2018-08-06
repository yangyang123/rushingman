/*
 * @Author: peiyang 
 * @Date: 2018-08-04 01:14:25 
 * @Last Modified by: peiyang
 * @Last Modified time: 2018-08-06 18:02:22
 */

namespace sleepybear {
    export class ObjectPool {
        private static pools: HashMap = new HashMap();
        constructor() {}

        private static getPool(cls: any): Array < any > {
            if (!this.pools.containKey(cls)) {
                this.pools.setValue(cls, new Array < any > ());
            }
            return this.pools.getValue(cls);
        }

        //获取对象
        public static create(cls: any): any {
            if (!cls) {
                return;
            }
            let pool: Array < any > = this.getPool(cls);
            if (pool.length > 0) {
                return pool.pop();
            }

            if (!(cls.prototype)) {
                cls = cls.constructor;
            }
            return new cls();
        }

        //释放对象
        public static free(cls: any): void {
            if (!cls) {
                return;
            }
            let pool: Array < any > = this.getPool(cls);
            pool.push(cls);
        }
    }
}