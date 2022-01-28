## [0.6.2](https://github.com/dolymood/uni-component/compare/v0.6.1...v0.6.2) (2022-01-28)


### Bug Fixes

* platform should return platformvnode ([a29680e](https://github.com/dolymood/uni-component/commit/a29680e1dc7a38f8fd41158c3ca9de2fd42a00c8))



## [0.6.1](https://github.com/dolymood/uni-component/compare/v0.6.0...v0.6.1) (2022-01-28)



# [0.6.0](https://github.com/dolymood/uni-component/compare/v0.5.1...v0.6.0) (2022-01-28)


### Features

* do not need platform.d.ts now ([b17746f](https://github.com/dolymood/uni-component/commit/b17746fb6d3f07e78765809860bf2a13d831b09c))
* ref: useRef now return setup state ([b17746f](https://github.com/dolymood/uni-component/commit/b17746fb6d3f07e78765809860bf2a13d831b09c))



## [0.5.1](https://github.com/dolymood/uni-component/compare/v0.5.0...v0.5.1) (2022-01-28)


### Bug Fixes

* default props should handle all rawProps ([299e3ec](https://github.com/dolymood/uni-component/commit/299e3eccdc8eef94f8a825e6f2018b9f80f4454d))
* defaultprops can be null ([5984014](https://github.com/dolymood/uni-component/commit/5984014d104ab2d06720c68c9c735088f44f0365))



# [0.5.0](https://github.com/dolymood/uni-component/compare/v0.4.3...v0.5.0) (2022-01-28)


### Features

* react support component ref ([0003e47](https://github.com/dolymood/uni-component/commit/0003e477f9bc9e2e66e4da1171d672586f32053d))



## [0.4.3](https://github.com/dolymood/uni-component/compare/v0.4.2...v0.4.3) (2022-01-27)


### Bug Fixes

* props should be stable ([16849f2](https://github.com/dolymood/uni-component/commit/16849f20e94e15caa879db2a46ee8b846fe86f8c))


## [0.4.2](https://github.com/dolymood/uni-component/compare/v0.4.1...v0.4.2) (2022-01-27)


### Bug Fixes

* **core:** context props should be stable ([3a5da67](https://github.com/dolymood/uni-component/commit/3a5da67572eb892ce7483373567190708e3f6077))



## [0.4.1](https://github.com/dolymood/uni-component/compare/v0.4.0...v0.4.1) (2022-01-26)


### Bug Fixes

* capture should only check child provide ([3e9d58e](https://github.com/dolymood/uni-component/commit/3e9d58e20f96de5f86c96e728e38f20912aecdb7))
* collect uni children for react case ([a585507](https://github.com/dolymood/uni-component/commit/a58550782a7a2737ada1e2deeea36ce721aad594))
* **react:** more transform keys ([019483c](https://github.com/dolymood/uni-component/commit/019483c2357c3c7d63a667389de19fb59b89a8c6))



# [0.4.0](https://github.com/dolymood/uni-component/compare/v0.3.0...v0.4.0) (2022-01-25)


### Bug Fixes

* attrs should append to renders ([aa06d1b](https://github.com/dolymood/uni-component/commit/aa06d1b13d71433541d4e19aea06dd4219f8e6fd))
* capture return type ([fc737c9](https://github.com/dolymood/uni-component/commit/fc737c92daac93dcb6602987a1f413301aa7f49a))
* capture should return Ref value ([b337047](https://github.com/dolymood/uni-component/commit/b337047ef5e34b7498ca2a5e81650866b1cad98e))
* children to render ([e552627](https://github.com/dolymood/uni-component/commit/e552627917b5fe6c3c6401d8b592bcb5082681fb))
* **core:** defaultProps should handle null case ([69b3add](https://github.com/dolymood/uni-component/commit/69b3add0771fcc7365d1f4087ccb2e63c27e13eb))
* **core:** should ignore undefined ([ce4bc52](https://github.com/dolymood/uni-component/commit/ce4bc52a44a85ab482f0431ecb85d84de9eb2154))
* do not update props and renders ([1cf53b0](https://github.com/dolymood/uni-component/commit/1cf53b0770b26d0807be6622649077c8950a7834))
* instance tree ([6a92c6e](https://github.com/dolymood/uni-component/commit/6a92c6ea37eb7fc90298208402661e638813f4a6))
* only component should handle slots ([0993bfd](https://github.com/dolymood/uni-component/commit/0993bfd389f9b4388f2d9c66e588b3fc9c0f31ce))
* props could be null ([c967767](https://github.com/dolymood/uni-component/commit/c9677677f17ff778a822a3ecb2e3480929038ee6))
* rootInstance set hooks ([466d9b9](https://github.com/dolymood/uni-component/commit/466d9b9a92278a53f757ac852e1593bfd3725596))
* type error ([52cefb4](https://github.com/dolymood/uni-component/commit/52cefb4409a7effa57222822fb58a37dfaeda2f7))
* **vue:** slots should be valiable when have content ([fd06b36](https://github.com/dolymood/uni-component/commit/fd06b3660adb76237ccdcf5edaf838e15af8553a))


### Features

* before add FC param ([2a468c6](https://github.com/dolymood/uni-component/commit/2a468c6224828e7494daaf32a13f2474fa78bc44))
* **core:** context support $attrs ([ce5bbe8](https://github.com/dolymood/uni-component/commit/ce5bbe808145a5db8bc9a04ef1db541e3f7a119e))
* **core:** support capture ([8f21468](https://github.com/dolymood/uni-component/commit/8f21468a4bddfdac8e1960175a6b285f09afbb68))
* **core:** support Fragment ([999b2ea](https://github.com/dolymood/uni-component/commit/999b2ea1ff32ff81bae527773c99108dc2bfdc29))
* **core:** support rootStyle & rootId ([52cc378](https://github.com/dolymood/uni-component/commit/52cc37867a8535c09015d9c8c6205d59c85b4037))
* drop slots, use renders ([1234bb8](https://github.com/dolymood/uni-component/commit/1234bb88855afc98bac9b64b8d4b0a86640b1918))
* instance add context prop ([51f65c8](https://github.com/dolymood/uni-component/commit/51f65c81655933f6656c28c677e6ca3246d45677))
* setup have context param ([b9ddc9b](https://github.com/dolymood/uni-component/commit/b9ddc9bbf01cc475c98c41022827fd666b4d1b6b))
* slots collect all xRender, xRender to slots ([d6da004](https://github.com/dolymood/uni-component/commit/d6da0046b8162a91da47b92172095039d6559d07))
* support attrs & nodeProps ([80c8c03](https://github.com/dolymood/uni-component/commit/80c8c03123306f936c2997229f3edd8c71ed7856))
* support beforeUniSetup hook ([a80de81](https://github.com/dolymood/uni-component/commit/a80de81e95d373e56fd125c306c570dabe3e577b))
* support PlatformFragment ([93757cc](https://github.com/dolymood/uni-component/commit/93757cc4d574fe4c73ea7bf432bd5cc524ce893e))
* **vue:** export setup result for vue refs ([ae696a3](https://github.com/dolymood/uni-component/commit/ae696a3208ff40224de030f9399edea9e3b99985))



# [0.3.0](https://github.com/dolymood/uni-component/compare/v0.1.1...v0.3.0) (2022-01-07)

### Features

* **core:** expprt getRootInstance ([db46c3b](https://github.com/dolymood/uni-component/commit/db46c3b7c7f26ed5e1c9245683e212eed54321b4))


## [0.1.1](https://github.com/dolymood/uni-component/compare/v0.0.1...v0.1.1) (2022-01-05)


### Bug Fixes

* **core:** child could be undefined ([6169fb3](https://github.com/dolymood/uni-component/commit/6169fb324884ffc2e9b76a35b26c595298511f48))
* **core:** createComponent support render param ([327cdbd](https://github.com/dolymood/uni-component/commit/327cdbdb859bdfafacf6c93df5ad457456b70736))
* **core:** get right instance when updating ([7c27365](https://github.com/dolymood/uni-component/commit/7c27365de9068e36519ba0ac0e7b2244e86bbd5a))
* **core:** h should ensure children is array ([e4e3941](https://github.com/dolymood/uni-component/commit/e4e3941576205276324ec4922e0aa1a6507cf54d))
* h children ([e0b8495](https://github.com/dolymood/uni-component/commit/e0b849555900ef5b5619eda430d1ca83087cc63e))
* **react:** warn ([facb82c](https://github.com/dolymood/uni-component/commit/facb82cbb69cdc1b8097b0a8e8b01799d0079cad))
* **vue:** transform events ([3e05a02](https://github.com/dolymood/uni-component/commit/3e05a0296f7cd353a77d30662e5e7893bb1babd3))


### Features

* support basic components
* **core:** default platform ([abefa81](https://github.com/dolymood/uni-component/commit/abefa812a6ce699d70bdaed1375708ecf7654d0f))
* **core:** support instance & provide-inject ([940ce64](https://github.com/dolymood/uni-component/commit/940ce64adadced52a1aada555b2e8a3cddbd4cc1))
* support platform & ref ([5792308](https://github.com/dolymood/uni-component/commit/57923085a5c37beeb886543519d2764621253dc2))


## 0.0.1 (2021-12-10)

### Bug Fixes

* define writable error ([cf16d85](https://github.com/dolymood/uni-component/commit/cf16d85ca4862ef01b87e1436a63d7fddad8e290))
* FCProps can be {} ([ca3b209](https://github.com/dolymood/uni-component/commit/ca3b2091d545d9c0c11b9c0fd33ad9dcbba03733))
* should be default value when bool cases ([f6c3181](https://github.com/dolymood/uni-component/commit/f6c31817e198f188a18478e7c8592c4e55757ab4))


### Features

* export types.d.ts ([f2cf35d](https://github.com/dolymood/uni-component/commit/f2cf35d40d1463567318bcaa66938b44b5119747))
* init base define uniComponent ([654817f](https://github.com/dolymood/uni-component/commit/654817fd9e2f89dbe817416d5e66ee979d57999f))
