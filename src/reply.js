DrNic.CommentReplies.replyToComment = function() {
  var comment = this.parentNode;
  var cite    = comment.getElementsByTagName('cite')[0];
  var author  = cite.innerHTML;
  
  document.getElementById('comment').value = '@' + author + ' - ';
};