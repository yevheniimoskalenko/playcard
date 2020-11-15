<template>
  <div>
    <div class="brend">
      <img src="http://via.placeholder.com/75x75" />
    </div>
    <el-card>
      <div class="form-header">
        <p>
          Обмін криптовалюти, буде виконаний через 10 хв. Після виконаної
          перевірки. Комісія переселяння коштів не врахована сайтом.
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
                @keyup.native="genSum($event)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="VITE" prop="amount">
              <el-input
                v-model="controller.amount"
                v-loading="loading"
                disabled
              />
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
          <el-button
            v-loading="loadingPay"
            type="primary"
            round
            @click="genButton"
            >Сплатити {{ countUAH }} UAH</el-button
          >
        </div>
        <div class="logo">
          <span>powered by</span>
          <img src="http://via.placeholder.com/50x25" />
        </div>
      </el-form>
    </el-card>
    <el-dialog
      title="Підтвердження платіжа"
      :visible.sync="dialog"
      width="30%"
      center
    >
      <div class="tablePay">
        <h2>Ви відаєте:{{ countUAH }} UAH</h2>
        <span>Відправляєте із :{{ controller.card }}</span>
        <h2>Ви отримуєте:{{ controller.amount }} VITE</h2>
        <span>На рахунок :{{ controller.vite }}</span>
        <div class="form-button-pay">
          <!-- eslint-disable-next-line -->
      <div v-html="controller.formPay"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Відмінити</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mask } from 'vue-the-mask'
// import payForm from '@/components/windowPay.vue'
export default {
  directives: { mask },
  components: {},
  data() {
    return {
      dialog: false,
      loading: false,
      loadingPay: false,
      countUAH: 10,
      controller: {
        email: '',
        amount: null,
        vite: '',
        memo: '',
        card: '',
        firstName: '',
        lastName: '',
        formPay: null
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
            message: 'Ведіть будь ласка карту для сплати.',
            trigger: ['blur', 'change']
          },
          {
            min: 19,
            message: 'В карті для сплати повино бути 12 цифер'
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

  async created() {
    await this.genSum()
  },

  methods: {
    async genSum() {
      this.loading = true
      try {
        const formData = {
          UAH: this.countUAH
        }
        const values = await this.$store.dispatch('exchangeValues', formData)
        this.controller.amount = await values
        this.loading = false
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    },
    genButton() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loadingPay = true
            const payForm = {
              UAH: this.countUAH,
              amount: this.controller.amount,
              vite: this.controller.vite,
              card: this.controller.card,
              memo: this.controller.memo,
              firstName: this.controller.firstName,
              lastName: this.controller.lastName,
              email: this.controller.email
            }
            const payButton = await this.$store.dispatch('payCoin', payForm)
            this.controller.formPay = await payButton
            this.candiadate = payForm
            this.dialog = true
            this.loadingPay = false
          } catch (e) {
            this.loadingPay = false
          }
        }
      })
    }
  },
  head: {
    title: 'Обмін валют'
  }
}
</script>
<style lang="scss" scoped>
.tablePay {
  padding: 10px;
  span {
    padding: 15px;
    line-height: 15px;
  }
  h2 {
    padding: 15px;
  }
}
.form-button-pay {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.mastercard {
  width: 50px;
  height: 35px;
  float: right;
  position: relative;
  top: 40px;
  background: url('~assets/mastercard.svg') no-repeat center;
  z-index: 2;
}
.visa {
  width: 50px;
  height: 35px;
  float: right;
  position: relative;
  top: 40px;
  background: url('~assets/visa.svg') no-repeat center;

  z-index: 2;
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
