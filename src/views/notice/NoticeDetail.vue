<template>
  <section class="detail">
    <el-form ref="form" label-width="120px">
      <el-form-item label="제목">
        <el-input readonly v-model="form.subj"></el-input>
      </el-form-item>
      <el-form-item label="구분" label-width="">
        <el-input readonly v-model="form.tp"></el-input>
      </el-form-item>
      <el-form-item label="작성일">
        <el-input readonly v-model="form.createdAt"></el-input>
      </el-form-item>
      <el-form-item label="내용">
        <el-input readonly v-html="form.conts"></el-input>
      </el-form-item>
    </el-form>
    <div class="bottomBtns">
      <el-button type="primary" @click="$router.push('/')">목록</el-button>
      <el-button type="primary" @click="$router.push({
        path:'/noticeRegister', query: { noticeId }})">수정</el-button>
      <el-button type="primary" @click="onDelete">삭제</el-button>
    </div>
  </section>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  // import axios from 'axios'
  import { noticeDelete, noticeDetail } from '@/api/app'
  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        noticeId: this.$route.query.noticeId,
        form: {
          subj: '',
          tp: '',
          createAt: '',
          conts: ''
        }
      }
    },
    created() {
      console.log('this.$route.query = ', this.$route.query)
      // console.log('this.$route.params = ', this.$route.params)

      // axios.get(`http://localhost:3000/notice/${this.noticeId}`)
      noticeDetail(this.noticeId)
        .then(res => {
          // 성공로직
          console.log(res)

          this.form = res.data.form
          
        })
        .catch(err => {
          // 실패로직
          console.log(err)
        })
        .finally(_ => {
          // 성공, 실패여부의 상관 없이 무조건 실행되는 로직
        })
    },
    methods: {
      onDelete() {
        // axios.delete(`http://localhost:3000/notice/${this.noticeId}`)
        noticeDelete(this.noticeId)
          .then(res => {
            console.log('==== res ====')
            console.log(res)
            console.log('==== res ====')

            this.$router.push('/noticeList')

          })
          .catch(err => console.log(err))
      }
    }
  }
</script>
<style scoped>
  .el-select .el-input {
    width: 110px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
