<template>
  <div>
    <div class="brend">
      <img src="http://via.placeholder.com/75x75" />
    </div>
    <el-card>
      <div class="form-header">
        <p>
          Обмін криптовалюти, буде виконаний через 10 хв. Після виконаної
          перевірки.
        </p>
      </div>
      <el-form ref="form" :model="controller" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="UAH" prop="valute">
              <el-input v-model="countUAH" v-mask="'####'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="VITE" prop="amount">
              <el-input v-model="controller.amount" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Одержувачі VITE" prop="vite">
          <el-input
            v-model="controller.vite"
            placeholder="vite_591e456aa84fccd65e4c916c258ef3b80fadd94eab6f37518c"
          />
        </el-form-item>
        <el-form-item label="MEMO" prop="memo">
          <el-input
            v-model.number.trim="controller.memo"
            v-mask="'#########'"
          />
        </el-form-item>
        <el-form-item label="Карта поповнення" prop="card">
          <el-input
            v-model="controller.card"
            v-mask="'#### #### #### ####'"
            placeholder="0000 0000 0000 0000"
          />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Ім'я" prop="firstName">
              <el-input
                v-model="controller.firstName"
                placeholder="Іван"
              /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="Прізвище" prop="lastName">
              <el-input
                v-model="controller.lastName"
                placeholder="Іванов"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="Електрона пошта" prop="email">
          <el-input v-model="controller.email" placeholder="test@test.ua" />
        </el-form-item>
        <div class="form-pay">
          <el-button type="primary" round
            >Сплатити {{ countUAH }} UAH</el-button
          >
        </div>
        <div class="logo">
          <span>powered by</span>
          <img src="http://via.placeholder.com/50x15" />
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'
export default {
  directives: { mask },
  data() {
    return {
      countUAH: 10,
      controller: {
        amount: null,
        vite: '',
        memo: '',
        card: '',
        firstName: '',
        lastName: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Ведіть будь ласка електройти адрес.',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Будь ласка ведіть коректно електройний адрес.',
            trigger: ['blur', 'change']
          }
        ],
        card: [
          {
            required: true,
            message: 'Ведіть будь ласка електройти адрес.',
            trigger: ['blur', 'change']
          }
        ],
        valute: [
          {
            min: 2,
            message: 'Повина бути більше 10 грн',
            trigger: ['blur', 'change']
          }
        ],
        firstName: [
          {
            required: true,
            message: "Ім'я повине бути заповнене",
            trigger: ['blur', 'change']
          }
        ],
        lastName: [
          {
            required: true,
            message: "Ім'я повине бути заповнене",
            trigger: ['blur', 'change']
          }
        ],
        vite: [
          {
            required: true,
            message: 'Ведіть будь ласка адрес гаманця'
          }
        ]
      }
    }
  },
  watch: {
    async countUAH(val) {
      const usdt = await axios({
        method: 'get',
        url: 'https://api.binance.com/api/v3/ticker/price?symbol=USDTUAH'
      }).then((res) => res.data.price)
      const vite = await axios({
        method: 'get',
        url: 'https://api.binance.com/api/v3/ticker/price?symbol=VITEUSDT'
      }).then((res) => res.data.price)
      this.controller.amount = await (val / usdt / vite).toFixed(3)
      await console.log(this.controller.amount)
    }
  }
}
</script>
