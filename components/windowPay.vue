<template>
  <div>
    <el-dialog
      title="Підтвердження платіжа"
      :visible.sync="hendler"
      width="30%"
      center
    >
      <span
        >It should be noted that the content will not be aligned in center by
        default</span
      >
      <div v-html="liqform"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hendler = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    hendler: {
      required: true,
      type: Boolean
    },
    liqform: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
