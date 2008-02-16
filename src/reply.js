DrNic.CommentReplies.replyToComment = function() {
  var comment = this.parentNode;
  var cite    = comment.getElementsByTagName('cite')[0];
  var author_link = cite.getElementsByTagName('a')[0];
  if (author_link) {
    var author = author_link.innerHTML;
  } else {
    var author = cite.innerHTML;
  }
  document.getElementById('comment').value = '@' + author + ' - ';
};