/*
 * @Author: peiyang 
 * @Date: 2018-08-06 11:11:27 
 * @Last Modified by: peiyang
 * @Last Modified time: 2018-08-06 17:52:12
 */

namespace sleepybear {
    export class HashMap {
        private _length: number = 0;
        private _obj: Object;

        private static id: number = 0;
        constructor() {
            this._length = 0;
            this._obj = new Object();
        }

        public get length(): number {
            return this._length;
        }

        public get obj(): Object {
            return this._obj;
        }

        private transKey(cls: any): any {
            if (typeof cls == 'number' || typeof cls == 'string') {
                return '' + cls;
            }
            if (!cls._hashObjUnicodeId) {
                cls._hashObjUnicodeId = '__HId__' + HashMap.id;
                HashMap.id++;
            }
            return cls._hashObjUnicodeId;
        }

        //判断是否为空
        public isEmpty(): boolean {
            return this._length == 0;
        }

        //判断键是否存在
        public containKey(cls: any): boolean {
            let key: string = this.transKey(cls);
            if (this.obj[key] != undefined) {
                return true;
            }
            return false;
        }

        //增加值
        public setValue(cls: any, obj: any): any {
            let key: string = this.transKey(cls);
            if (!key) {
                throw new Error("cannot put a value with undefined or null key!");
            }
            if (!obj) {
                return this.removeValue(cls);
            }
            if (!this.containKey(cls)) {
                this._length++;
            }
            this.obj[key] = obj;
            return obj;
        }

        //清除键
        public removeValue(cls: any): any {
            let key: string = this.transKey(cls);
            if (!this.containKey(cls)) {
                return null;
            }
            let result = this.obj[key];
            this.obj[key] = null;
            delete this.obj[key];
            this._length--;
            return result;
        }

        //获取值
        public getValue(cls: any): any {
            let key: string = this.transKey(cls);
            if (this.containKey(cls)) {
                return this.obj[key];
            }
            return null;
        }
    }
}