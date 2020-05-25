/**
 * 
 * @param {*} data  // vue 中的 data 属性
 * @param {*} vm    // vue 实例  
 */
function Observer(data, vm) {
    Object.keys(data).forEach(key => {

        var dep = new Dep();

        Object.defineProperty(vm, key, {
            get: function gett() {
                return data[key];  // return 后结果相当于 => get: data[key]
            },
            set: function sett(val) {
                return data[key] = val;
            }
        })
    })
}




function Dep() {
    this.subs = [];
}

Dep.prototype = {

    // 将 watcher 添加到 dep 中
    addSub(sub) {
        this.subs.push(sub);
    },

    // 将 dep 添加到 watcher
    depend: function () {
        Dep.target.addDep(this);
    },

    // 遍历所有的 watcher， 通知 watcher 更新
    notify() {
        this.subs.forEach(function (sub) {
            sub.update();
        })
    }
}


/**
 * 
 * @param {*} option    // vue 的配置 
 */
function Vue(options) {
    var data = this.data = options.data;
    Observer(data, this)
}


var vm = new Vue({
    el: "app",
    data: {
        name: 'ssss'
    }
})

console.log(vm.name)