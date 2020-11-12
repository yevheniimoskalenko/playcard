<template>
  <div>
    <el-dialog
      title="Підтвердження платіжа"
      :visible.sync="hendler"
      width="30%"
      center
    >
      <!-- <h2>Ви відаєте:{{ candiadate.UAH }}UAH</h2> -->
      <!-- <span>Відправляєте із :{{ candiadate.card }}</span>
      <h2>Ви отримуєте:{{ candiadate.amount }} VITE</h2>
      <span>На рахунок :{{ candiadate.vite }}</span> -->
      <!-- eslint-disable-next-line -->
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
    },
    candiadate: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
