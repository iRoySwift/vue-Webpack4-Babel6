<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Hello World!'
      };
    },
    created() {
      console.log('object');
    }


  };
</script>
