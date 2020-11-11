<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      this.$message({
        message: `${value.message}`,
        type: `${value.status}`
      })
    }
  }
}
</script>
