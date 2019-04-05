<template>
  <section class="detail">
    <el-form label-width="180px">

      <el-form-item label="제목" prop="subj">
        <el-input v-model="form.subj"></el-input>
      </el-form-item>

      <el-form-item label="파업구분">
          <el-select v-model="form.tp">
            <el-option
              v-for="(item, index) in tpOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="대체텍스트" v-show="form.tp === '20'">
        <el-input v-model="form.conts"></el-input>
      </el-form-item>

      <el-form-item label="바로가기">
        <el-radio-group v-model="form.cnnt_url_yn">
          <el-radio label="사용"></el-radio>
          <el-radio label="미사용"></el-radio>
        </el-radio-group>
        <el-input v-model="form.cnnt_url" placeholder="팝업 이미지 클릭시 이동할 URL을 입력하세요.">
        </el-input>
      </el-form-item>

      <el-form-item label="이미지등록">
        <el-upload :disabled="form.tp === '20'"
          class="upload-demo"
          action=""
          name="file"
          :multiple="false"
          :on-remove="onImgRemove"
          :on-change="onImgChange"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="info">파일업로드</el-button>
          <div slot="tip" :class="[ 'ex-1', { 'ex-2': classChk } ]">※ JPG,PNG 파일만 업로드 가능합니다. 해상도는 400 X 600에 최적화 되어있습니다.</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="classChk=!classChk">CLASS TEST</el-button>
      </el-form-item>
    </el-form>

    <div class="bottomBtns">
      <el-button v-if="!modifyYn" type="primary" @click="onSubmit('form')">등록</el-button>
      <el-button v-if="modifyYn" type="primary" @click="onUpdate('form')">수정</el-button>
      <el-button type="primary" @click="onCancel">취소</el-button>
      <!-- <el-button type="primary" @click="SET_MODAL(true)">미리보기</el-button> -->
      <el-button type="primary" @click="$store.commit('SET_MODAL', true)">미리보기</el-button>
    </div>

    <popup-modal 
      :modalForm="form"
      :modalFile="fileUrl"
      v-if="showModal" 
      @close="$store.commit('SET_MODAL', false)" />

  </section>
</template>

<script>
import PopupModal from '@/views/popup/PopupModal'
import { mapState, mapMutations } from 'vuex'
// import axios from 'axios'
import { popupRegister } from '@/api/app'
  export default {
    components: {
      PopupModal
      // modal: PopupModal
    },

    computed: {
      ...mapState({
        showModal: state => state.modal.showModal
      })
    },

    data() {
      return {
        form: {
          subj: '',
          tp: '10',
          conts: '',
          cnnt_url_yn: '',
          cnnt_url: ''
        },
        
        fileList: [],
        modifyYn: false,
        // showModal: false,
        fileUrl: '',
        imgFile: '',

        tpOptions: [{
          value: '10',
          label: '기본'
        }, {
          value: '20',
          label: '이용동의'
        }, {
          value: '30',
          label: '이벤트'
        }],

        classChk: true
      }
      
    },
    
    methods: {
      ...mapMutations([
        'SET_MODAL'
      ]),

      // 글 등록
      onSubmit() {
        const formData = new FormData()

        formData.append('form', JSON.stringify(this.form))

        if (this.imgFile) formData.append('image', this.imgFile.raw)

        // 객체가 아닌 formData 그대로 보냅니다
        // axios.post('http://localhost:3000/popup', formData)
        popupRegister(formData)
          .then(res => {
            console.log('===== response =====')
            console.log(res.data)
            console.log('===== response =====')
          })
          .catch(err => console.log(err))

      },
    
      // 글 수정
      onUpdate() {
        
      },

      // 글 등록 취소
      onCancel() {
        
      },

      // 이미지 삭제
      onImgRemove(file, fileList) {
        console.log('===== onImgRemove =====')
        console.log(file);
        console.log('===== onImgRemove =====')
        this.imgFile = ''
      },

      // 이미지 변환
      onImgChange(file, fileList) {
        console.log('===== file ====')
        console.log(file)
        console.log('===== file ====')
        this.fileUrl = file.url

        let fileName = file.name

        console.log('fileNmae = ', fileName)
        
        let lastDot = fileName.lastIndexOf('.')

        console.log('lastDot = ', lastDot)

        let fileExt = fileName.substring(lastDot).toLowerCase()

        console.log('fileExt = ', fileExt)

        if (fileExt !== '.jpg' && fileExt !== '.png' && fileExt !== '.jpeg') {
          alert("JPG, PNG파일만 업로드 가능합니다")
          this.fileList = []
        } else {
          this.imgFile = file
        }
      },
      // classFn() {
      //   return false
      // }
    }
  }
</script>
<style scoped>
  .ex-1 {
    color: red
  }
  .ex-2 {
    display: none
  }
</style>

