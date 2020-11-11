<template>
  <div>
    <el-card>
      <div class="form-header">
        <p>
          Обмін криптовалюти, буде виконаний через 10 хв. Після виконаної
          перевірки.
        </p>
      </div>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="UAH">
              <el-input v-model="controller.amount" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="VITE">
              <el-input v-model="controller.amount" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Одержувачі VITE">
          <el-input v-model="controller.amount" />
        </el-form-item>
        <el-form-item label="MEMO">
          <el-input v-model="controller.amount" />
        </el-form-item>
        <el-form-item label="Карта поповнення">
          <el-input v-model="controller.amount" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Ім'я">
              <el-input v-model="controller.amount" /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="Прізвище">
              <el-input v-model="controller.amount" /> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="Електрона пошта">
          <el-input v-model="controller.amount" />
        </el-form-item>
        <el-button type="primary" round>Primary</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      controller: {
        amount: 0
      }
    }
  }
}
</script>
