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
              <el-input
                v-model="countUAH"
                v-mask="'####'"
                :minlength="2"
                :maxlength="3"
              />
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
          <div v-if="controller.card[0] === '4'" class="mastercard"></div>
          <div v-else-if="controller.card[0] === '5'" class="visa"></div>
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
          <img src="http://via.placeholder.com/50x25" />
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
<style lang="scss" scoped>
.mastercard {
  width: 50px;
  height: 35px;
  float: right;
  position: relative;
  top: 40px;
  background: url('~assets/mastercard.svg') no-repeat center;
  z-index: 9999;
}
.visa {
  width: 50px;
  height: 35px;
  float: right;
  position: relative;
  top: 40px;
  background: url('~assets/visa.svg') no-repeat center;

  z-index: 9999;
}
.brend {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  img {
    border-radius: 50%;
  }
}
.form-pay {
  display: flex;
  justify-content: center;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  span {
    padding: 15px;
  }
}
.form-header {
  text-align: center;
  p {
    color: #7d2691;
  }
}
</style>
