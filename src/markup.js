DrNic.CommentReplies.markup = function() {
  var li_list = document.getElementsByTagName('li');
  for (var i=0; i < li_list.length; i++) {
    if (li_list[i].className == "comment") {
      this.markupComment(li_list[i]);
    }
  };
};

DrNic.CommentReplies.markupComment = function(comment) {
  var link = document.createElement("a");
  link.className = "reply";
  link.innerHTML = "reply";
  link.href      = "#commentform";
  link.onclick   = DrNic.CommentReplies.replyToComment;
  comment.appendChild(link);
};