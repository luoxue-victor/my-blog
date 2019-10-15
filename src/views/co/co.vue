<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const co = require('co');

@Component
export default class Co extends Vue {
  private msg: string = 'co';

  created() {
    console.log('created')
    function asyncGeneratorStep(
      gen: any,
      resolve: any,
      reject: any,
      _next: any,
      _throw: any,
      key: any,
      arg: any
    ) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn: any) {
      console.log('async')
      return function(this: any) {
        console.log(this)
        var self: any = this,
          args = arguments;
        return new Promise(function(resolve, reject) {
          console.log('1111')
          var gen = fn.apply(self, args);
          function _next(value: any) {
            asyncGeneratorStep(
              gen,
              resolve,
              reject,
              _next,
              _throw,
              'next',
              value
            );
          }
          function _throw(err: any) {
            asyncGeneratorStep(
              gen,
              resolve,
              reject,
              _next,
              _throw,
              'throw',
              err
            );
          }
          _next(undefined);
        });
      };
    }

    _asyncToGenerator(function () {
      console.log('123123')
    })()

    // co(function*() {
    //   // resolve multiple promises in parallel
    //   var a = Promise.resolve(1);
    //   var b = Promise.resolve(2);
    //   var c = Promise.resolve(3);

    //   var res = yield [a, b, c];
    //   console.log(res);
    //   // => [1, 2, 3]
    // }).catch(onerror);
  }
}
</script>

<style scoped lang="scss">
</style>