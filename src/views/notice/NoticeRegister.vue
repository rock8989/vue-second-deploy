<template>
  <section class="detail">
    <el-form ref="form" label-width="150px">
      <el-form-item label="제목">
        <el-input v-model="form.subj"></el-input>
      </el-form-item>
      <el-form-item label="헤드라인 등록">
        <el-radio-group v-model="form.tp">
          <el-radio label="헤드라인"></el-radio>
          <el-radio label="일반"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="팝업개시 대상" prop="">
        <el-checkbox-group v-model="form.init">
          <el-checkbox label="PC Web"></el-checkbox>
          <el-checkbox label="Mobile Web"></el-checkbox>
          <el-checkbox label="APP"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="내용">
        <vue-editor id="editor" v-model="form.conts"></vue-editor>
      </el-form-item>
    </el-form>
    <div class="bottomBtns">
      <el-button type="primary" v-if="!noticeId" @click="onSubmit">등록</el-button>
      <el-button type="primary" v-else @click="onModify">수정</el-button>
      <el-button type="primary">취소</el-button>
    </div>
  </section>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  // import axios from 'axios'
  import { noticeDetail, noticeRegister, noticeModify } from '@/api/app'
  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        form: {
          subj: '',
          tp: '',
          init: [],
          conts: '',
        },
        noticeId: this.$route.query.noticeId
      }
    },
    created() {
      // noticeId가 있을 때만 타도록 즉 넘어온 쿼리스트링이 있을 때만 타게끔 한다.
      if (this.noticeId) {
        console.log('noticeId = ', this.$route.query.noticeId)

        // axios.get(`http://localhost:3000/notice/${this.noticeId}`)
        noticeDetail(this.noticeId)
          .then(res => {
            // 성공로직
            console.log(res)

            this.form = res.data.form
            
            this.form.tp = res.data.form.tp

            console.log('split = ', res.data.form.init.split(','));
            
            this.form.init = res.data.form.init.split(',')
            
          })
          .catch(err => {
            // 실패로직
            console.log(err)
          })
          .finally(_ => {
            // 성공, 실패여부의 상관 없이 무조건 실행되는 로직
          })
        }

    },
    methods: {
      onSubmit() {
        // axios({
        //   method: 'POST',
        //   url: 'http://localhost:3000/notice',
        //   data: { form:this.form }
        // })
        noticeRegister({form:this.form})
          .then(res => {
            console.log(res)

            this.$router.push({ path:'NoticeDetail', query: { noticeId: res.data.noticeId }})

            // this.$router.push({ name:'NoticeDetail', params: { noticeId: res.data.noticeId }})

          })
          .catch(err => {
            console.log(err)
          })
          .finally(_ => {

          })
      },
      noticeModify() {
        // axios.put(`http://localhost:3000/notice/${this.noticeId}`, {
        //   form: this.form
        // })
        noticeModify({form:this.form})
          .then(res => {
            console.log('===== res =====')
            console.log(res)
            console.log('===== res =====')

            this.$router.push({ path:'/noticeDetail', query:{noticeId: res.data.noticeId}})
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

