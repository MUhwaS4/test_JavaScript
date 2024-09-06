// 책 번호
let bookNum = 0;

// 책 목록을 담을 map 선언
let bookList = new Map();

// 도서 추가
function registerBook() {
  let category = document.getElementById("category").value;
  let bookName = document.getElementById("bookname").value;
  let price = document.getElementById("bookprice").value;

  // 출력할 메시지를 담을 배열 선언
  let message = [];

  // 카테고리를 선택하지 않았을 경우 메시지 추가
  if (category == "") {
    message.push("카테고리를 선택하세요.")
  }
  // 도서명 value가 공란일 경우 메시지 추가
  if (bookName == "") {
    message.push("도서명을 입력하세요.")
  }
  // 가격 value가 공란일 경우 메시지 추가
  // type="number"의 경우 숫자 외의 값을 받아들이지 않기 때문에 별도 정규식 체크 생략
  if (price == "") {
    message.push("가격을 입력하세요.")
  }

  // 카테고리와 도서명이 동일한 도서가 있을 경우 해당 도서 추가 불가 메시지 추가
  bookList.forEach(function(book) {
    if (book.bookName == bookName && book.category == category) {
      message.push("같은 카테고리 안에 동일한 책이 등록되어 있습니다.")
    }
  })

  // 메시지 배열에 입력된 메시지가 있다면 alert로 출력
  // 그렇지 않다면 도서 등록 진행
  if (message.length > 0) {
    alert(message.join("\n"));
    return;
  } else {
    alert("도서가 성공적으로 등록되었습니다.");
    bookList.set(++bookNum, {category, bookName, price});
  }

  let list = document.getElementById("book-list-tbody");
  
  let text = `<tr class="item_list">
                  <td class="list_num">${bookNum}</td>
                  <td class="list_cate">${category}</td>
                  <td class="list_name">${bookName}</td>
                  <td class="list_price">${price}원</td>
                  <td><button id="removeBook" onclick="removeBook(this)">삭제</button></td>
              </tr>`
  
  list.insertAdjacentHTML("beforeend", text);

  // 입력칸 초기화
  document.getElementById("category").value = "";
  document.getElementById("bookname").value = "";
  document.getElementById("bookprice").value = "";
  
}

// 도서 삭제
function removeBook(btn) {
  let line = btn.closest("tr");
  line.remove();
}

function listUpDown() {
  // tr 리스트 중 특정 td 값을 비교해서 위아래로 위치 옮기기

  // 정렬 기준 호출
  let CkUpDown = document.getElementById("sort-select").value;

  // 비교해야 할 테이블 / 행 호출
  const listTbody = document.getElementById("book-list-tbody");
  let row = Array.from(listTbody.querySelectorAll("tr"));

  // 행 정렬
  row.sort(
    function (a, b) {
      // 행 중 4번째 index에 가격이 있으므로 [3] 호출, text 중 금액만 놓고 비교해야 하므로 replace 이용해서 '원' 삭제
      const cellA = a.querySelectorAll("td")[3].textContent.replace("원", "");
      const cellB = b.querySelectorAll("td")[3].textContent.replace("원", "");
      
      if (CkUpDown == "ascending") {
        // 오름차순 정렬일 경우
        return cellA - cellB;    
      } else if (CkUpDown == "descending") {
        // 내림차순 정렬일 경우
        return cellB - cellA;
      } else {
        // 항목이 선택되지 않았을 경우 순서를 기준으로 정렬
        const aNum = a.querySelectorAll("td")[0].textContent;
        const bNum = b.querySelectorAll("td")[0].textContent;
        return aNum - bNum;
      }
      
    }
  )

  // 바꾼 행 정렬에 맞춰서 리스트 재출력(저장)
  row.forEach(
    function(list) {
      listTbody.appendChild(list);
    }
  )
}

function searchList() {
  // 검색할 내용 확인
  let searchText = document.getElementById("search-input").value;

  // 검색 내용과 매칭할 내용 리스트 확인
  let searchName = document.querySelectorAll(".list_name");

  let searchError = [];

  // 리스트 배열을 순회
  searchName.forEach(
    function (book) {
      // 검색 제목을 기준으로 부모 요소 확인
      let bookP = book.closest("tr");

      // 검색 내용이 비었을 경우 view class 입력 (display: 디폴트 값 설정)
      if (searchText == "") {
        bookP.classList.add("view");
        bookP.classList.remove("hidden");
        searchError.push("검색어를 입력해주세요!")
        return;
      }

      // 검색 내용과 동일한 항목이 존재할 경우 view, 없을 경우 hidden
      // indexOf의 경우 동일한 항목이 없다면 -1을 반환함
      if (book.textContent.indexOf(searchText) != -1) {
        bookP.classList.add("view");
        bookP.classList.remove("hidden");
      } else {
        bookP.classList.add("hidden");
        bookP.classList.remove("view");
      }
    }
  )

  if (searchError.length > 0) {
    alert(searchError);
  }
}

function reset() {

  let list = document.querySelectorAll("tr");

  document.getElementById("category").value = "";
  document.getElementById("bookname").value = "";
  document.getElementById("bookprice").value = "";
}