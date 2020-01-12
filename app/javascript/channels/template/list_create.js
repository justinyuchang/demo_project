const list_create = `<div>

<div data-role="list-group-item" class="list-group item"  id="">
    <div data-role="list-wrapper" class="list-wrapper">
      <div class='list-content box'>
        <div data-role= "list-item" class="list-item" >
          <input data-role="list-id" type="hidden" val= "">
          <span data-role="list-title" class="list-view"></span>
          <span class="list-men"><i class="fas fa-align-justify"></i></span>
        </div>
        
        <div data-role="card-wrapper" class="card-wrapper">

          <div data-role="card-group" class="card-group" id="card-sortable">
            <div data-role="sort-able hidden" class="sortable-hidden"></div>
          </div>

          <div class="card-input-controller">
            <div data-role="card-input" class="card-create input">
              <textarea class="card-create-area" name="card-text"></textarea>
            </div>

            <div data-role="card-btn" class="card-create btn">
              <button data-role="card-create-btn" class="card-add btn btn-success">送出</button>
              <span class="card-add-bot"><i class="list-cle fas fa-times"></i></span>
            </div>
          </div>

          <div class= "card-create-drop">
            <span class="card-create-span"><i class="card-add-i fas fa-plus"></i>新增卡片</span>
          </div>
        </div>
      </div>
    </div>
</div>

                                        </div>` 

export default list_create;