<template>
  <div>
    <a @click="startOrStopRecording" href="#">{{ recording ? '記録停止' : '記録開始' }}</a>

    <table id="script" class="script">
      <tr>
        <th>Step type</th>
        <th>Arguments</th>
      </tr>
      <tr v-for="step in steps" class="step">
        <td>{{ step.type }}</td>
        <td>{{ step.attrs }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" src="./app.vue.ts"></script>
