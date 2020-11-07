<template>
  <div class="container center">
    <div class="row d-flex justify-content-center align-items-center">

      <div class="col-6 center">
        <div class="form-container">
          <div class="form-top">
          <p>Будьте внимательны! Kuna Pay не является партнерем OLX Group
            и Nova Poshta и не обрабатывает их операции</p>
          <h2>345UAH</h2>
          </div>

          <form>
          <div class="form-group"><img src="../assets/mastercard.png" alt="mastercard"
          class="mastercard">
            <input type="text" class="form-control card" placeholder="0000 0000 0000 0000">
          </div>
          <div class="row">
            <div class="col">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="00/00">
          </div>
            </div>
            <div class="col">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="CVV">
          </div>
            </div>
          </div>
          <div class="footer-btn">
            <button class="btn pay">Оплатить 345 UAH</button>
            <div class="logo">
              <span>powered by</span>
            <img src="https://pay.kuna.io/static/img/svg/logo.svg">
            </div>
          </div>

        </form>
      </div>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
};
</script>
<style lang="scss" scoped>
.mastercard{
  width: 30px;
  height: 30px;
  position: relative;
  right: 10px;
  float: right;
  top: 33px;
  z-index: 99;
}
.form-container{
  width:75%;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
}
.logo{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
    span{
      font-size: 12px;
      position: relative;
      top: 15px;
  }
}
.pay {
  width: 100%;
  background: #8F00F0;
  color: #fff;
  border-radius: 7px;
  &:hover{
  background: #7c0fc5;

  }
}
.form-top{
margin:30px 0;
display: flex;
justify-content:center;
flex-direction: column;
align-items: center;
p{
  line-height: 16px;
  font-size: 14px;
}
  p, h2{
    text-align: center;
    color: #7D2691;
  }
}
.footer-btn{
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
.form-control{
 border: 3px solid #F5F7F8;
 border-left:none;
 border-right:none;
 border-top:none;
 color: #1C1C1C;
 font-weight: 400;
 ::placeholder{
   color:#ADAACE;
 }
}
.card{
  padding-right: 45px;
  z-index: 1;

}
.center{
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100vh;
}
</style>
