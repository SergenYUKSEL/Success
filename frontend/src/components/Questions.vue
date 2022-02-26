<template>
<!-- eslint-disable -->
    <div>
       <span v-for="(question,i) in questions">
         <label for="q"><b>Question n°{{i+1}} : </b>{{question.questionContent}} :</label>
         <input class="form-control" type="text" name="q" id="q" v-model="reponse[i]">
         <br>
       </span>
       
    </div>
</template>

<script>
/* eslint-disable */

export default {
  props:{
    questions: Array,
    reponse: Array,
  },

  data() {
    return {
      
    }
  },
  
    
  
}
</script>