const invite_create = `<div>
<div class="toast fade show" role="alert" data-autohide="false" aria-live="assertive"   aria-atomic="true">
<div class="toast-header">
  <div class="welcome far fa-paper-plane">
    <div class="welcome-message">有人邀請您加入他的看板</div> 
  </div>
  <div class="invited-time">
    <small class="js-invited-small"></small>
  </div> 
</div>
<div class="toast-body">
  <div class="invitation-message">
    
  </div>
  <div class="answer">
  <a class="btn btn-info btn-sm" data-remote="true" rel="nofollow" data-method="put" href="">同意</a>
  <a class="btn btn-dark btn-sm" data-remote="true" rel="nofollow" data-method="put" href="">拒絕</a>
  </div>
</div>
</div>
                      </div>`
                                            
export default invite_create;