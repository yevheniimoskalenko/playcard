<template>
  <div class="container center">
    <div class="brend">
      <img src="http://via.placeholder.com/75x75" />
    </div>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 center">
        <div class="form-container">
          <div class="form-top">
            <p>Обмін криптовалюти, буде виконаний через 10 хв. Після виконаної перевірки.</p>
            <div class="group">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <span>UAH</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="1000"
                      v-mask="'####'"
                      v-model="countUah"
                    />
                    <small>max 300</small>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                    <span>VITE</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="1000"
                      v-model="control.amount"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <span>Одержувачі VITE</span>

            <input
              type="text"
              class="form-control"
              placeholder="vite_591e456aa84fccd65e4c916c258ef3b80fadd94eab6f37518c"
              v-model="control.vite"
            />
          </div>
          <div class="form-group">
            <span>MEMO</span>
            <input type="text" class="form-control" placeholder="MEMO" v-model="control.memo" />
          </div>
          <form>
            <div class="form-group">
              <div v-if="control.card[0] === '4'">
                <img src="../assets/mastercard.svg" alt="mastercard" class="mastercard" />
              </div>
              <div v-else-if="control.card[0] === '5'">
                <img src="../assets/visa.svg" alt="visa" class="mastercard" />
              </div>
              <input
                type="text"
                class="form-control card"
                placeholder="0000 0000 0000 0000"
                v-mask="'#### #### #### ####'"
                v-model="control.card"
              />
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Иван"
                    v-model="control.firstName"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Иванов"
                    v-model="control.lastname"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <span>E-mail</span>
              <input
                type="text"
                class="form-control"
                placeholder="test@test.ua"
                v-model="control.lastname"
              />
            </div>
            <div class="footer-btn">
              <button class="btn pay">Оплатить {{ countUah }} UAH</button>
              <div class="logo">
                <span>powered by</span>
                <img src="http://via.placeholder.com/50x15" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'

export default {
  title: 'Обмін криптовалюти',
  name: 'Home',
  data() {
    return {
      countUah: 1,
      control: { card: '', amount: null, vite: '', memo: '' }
    }
  },
  watch: {
    async countUah(val) {
      const usdt = await axios({
        method: 'get',
        url: 'https://api.binance.com/api/v3/ticker/price?symbol=USDTUAH'
      }).then((res) => res.data.price)
      const vite = await axios({
        method: 'get',
        url: 'https://api.binance.com/api/v3/ticker/price?symbol=VITEUSDT'
      }).then((res) => res.data.price)
      this.control.amount = await (val / usdt / vite).toFixed(3)
    }
  },

  directives: { mask }
}
</script>
<style lang="scss" scoped>
.brend {
  padding: 10px;
  margin-top: 150px;
  img {
    display: block;
    border-radius: 50%;
  }
}
.mastercard {
  width: 30px;
  height: 30px;
  position: relative;
  right: 10px;
  float: right;
  top: 33px;
  z-index: 99;
}
.form-container {
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  min-width: 300px;
  width: 75%;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
}
.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 12px;
    position: relative;
    top: 15px;
  }
}
.pay {
  width: 100%;
  background: #8f00f0;
  color: #fff;
  border-radius: 7px;
  &:hover {
    background: #7c0fc5;
  }
}
.form-top {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  p {
    line-height: 16px;
    font-size: 14px;
  }
  p,
  h2 {
    text-align: center;
    color: #7d2691;
  }
}
.footer-btn {
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 20px;
    width: 35%;
  }
}
.form-control {
  border: 3px solid #f5f7f8;
  border-left: none;
  border-right: none;
  border-top: none;
  color: #1c1c1c;
  font-weight: 400;
  ::placeholder {
    color: #adaace;
  }
}
.card {
  padding-right: 45px;
  z-index: 1;
}
.center {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
